---
title: "Drawing a maze in Android"
pubDate: "2024-03-11"
description: "Generate and draw a maze in Android using a depth-first search algorithm and Canvas for a multiplayer game."
author: "Puntogris"
tags: ["android", "canvas"]
draft: false
image:
  cover: "../../images/android-maze/cover.webp"
  alt: "Post cover"
---

A YouTube video once suggested that creating a multiplayer maze game would make an exciting portfolio project. The idea was simple yet fun: generate a shared maze for all players, and whenever someone wins, a new maze is generated for everyone to play again.

I decided to try it out in Android as part of my portfolio project. In this post, I'll walk you through the process of generating and drawing a maze in Android. We'll focus mainly on the UI code and skip the backend for now.

## Maze generation

The maze generation is based on [depth-first search](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search)

A maze can be seen as a grid of cells, each surrounded by walls. Starting at a random cell, we use depth-first search (DFS) to explore. For each cell, we find an unvisited neighbor, break the wall between them, and move on. If no unvisited neighbors remain, we backtrack until we find one, repeating the process until all cells have no unvisited neighbors.

<video controls>
  <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7d/Depth-First_Search_Animation.ogv/Depth-First_Search_Animation.ogv.360p.vp9.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Implementation

Below is the Kotlin code to generate a 2D array of cells, each representing a part of the maze. The algorithm starts at the top-left corner (`cells[0][0]`) and explores until the stack is empty.

```kotlin
val cells = Array(mazeCols) { Array(mazeRows) { Cell() } }

fun createMaze(): Array<Array<Cell>> {
    val stack = Stack<Cell>()
    var current: Cell
    var next: Cell?

    repeat(mazeCols) { col ->
        repeat(mazeRows) { row ->
            cells[col][row] = Cell(col, row, player.id, player.color)
        }
    }
    current = cells[0][0]
    current.visited = true

    do {
        next = getNeighbour(current)
        if (next != null) {
            removeWall(current, next)
            stack.push(current)
            current = next
            current.visited = true
        } else {
            current = stack.pop()
        }

    } while (!stack.empty())
    return cells
}
```

This function will try to get a random unvisited neighbor.

```kotlin
fun getNeighbour(cell: Cell): Cell? {
    val neighbourList: ArrayList<Cell> = arrayListOf()
    if (cell.col > 0 && !cells[cell.col - 1][cell.row].visited) {
        neighbourList.add(cells[cell.col - 1][cell.row])
    }
    if (cell.col < mazeCols - 1 && !cells[cell.col + 1][cell.row].visited) {
        neighbourList.add(cells[cell.col + 1][cell.row])
    }
    if (cell.row > 0 && !cells[cell.col][cell.row - 1].visited) {
        neighbourList.add(cells[cell.col][cell.row - 1])
    }
    if (cell.row < mazeRows - 1 && !cells[cell.col][cell.row + 1].visited) {
        neighbourList.add(cells[cell.col][cell.row + 1])
    }
    return if (neighbourList.size > 0) {
        neighbourList[random.nextInt(neighbourList.size)]
    } else {
        null
    }
}
```

To connect two cells, we remove the wall between them:

```kotlin
fun removeWall(current: Cell, next: Cell) {
    if (current.col == next.col && current.row == next.row + 1) {
        current.topWall = false
        next.bottomWall = false
    }
    if (current.col == next.col && current.row == next.row - 1) {
        current.bottomWall = false
        next.topWall = false
    }
    if (current.col == next.col + 1 && current.row == next.row) {
        current.leftWall = false
        next.rightWall = false
    }
    if (current.col == next.col - 1 && current.row == next.row) {
        current.rightWall = false
        next.leftWall = false
    }
}
```

## Drawing

We can draw the maze by using a canvas in a custom view and overriding the `onDraw` method. The process involves looping through the entire matrix and drawing each wall individually.

```kotlin
fun Canvas.drawMazeCellWalls() {
    val maze = arrayListOf<Float>().apply {
        mazeCells.flatten().forEach {
            if (it.topWall) {
                add(it.col * cellSize - WALL_SIZE)
                add(it.row * cellSize)
                add(it.col.inc() * cellSize + WALL_SIZE)
                add(it.row * cellSize)
            }
            if (it.leftWall) {
                add(it.col * cellSize)
                add(it.row * cellSize - WALL_SIZE)
                add(it.col * cellSize)
                add(it.row.inc() * cellSize)
            }
            if (it.bottomWall) {
                add(it.col * cellSize - WALL_SIZE)
                add(it.row.inc() * cellSize)
                add(it.col.inc() * cellSize + WALL_SIZE)
                add(it.row.inc() * cellSize)
            }
            if (it.rightWall) {
                add(it.col.inc() * cellSize)
                add(it.row * cellSize - WALL_SIZE)
                add(it.col.inc() * cellSize)
                add(it.row.inc() * cellSize)
            }
        }
    }
    drawLines(maze.toFloatArray(), getWallPaint(mazeAlpha))
}
```

To draw each player we can do something like this:

```kotlin
fun Canvas.drawPlayerCell(cell: Cell) {
    with(cell) {
        playerPaint.color = Color.parseColor(color)
        playerPaint.setShadowLayer(12f, 0f, 0f, Color.parseColor(color))
        drawOval(
            col * cellSize + marginMazeScreen,
            row * cellSize + marginMazeScreen,
            (col + 1) * cellSize - marginMazeScreen,
            (row + 1) * cellSize - marginMazeScreen,
            playerPaint
        )
    }
}
```

## Database and Networking

For the database, I used Firebase Firestore. While it’s convenient and offers a generous free tier, it has limitations, such as a write per-second cap. If multiple users update their positions frequently, this could cause lag or data loss.

For real-time synchronization, WebSockets would be a better choice, allowing smoother player movements and reducing latency.

To update the player's position, we can override `onTouchEvent` and calculate in which direction the player should move.

```kotlin
fun getMoveDirection(
    event: MotionEvent,
    cellSize: Float,
    hMargin: Float,
    vMargin: Float
): Direction {
    val playerCenterX = hMargin + (col + MARGIN_OFFSET) * cellSize
    val playerCenterY = vMargin + (row + MARGIN_OFFSET) * cellSize
    val dx = event.x - playerCenterX
    val dy = event.y - playerCenterY
    val absDx = abs(dx)
    val absDy = abs(dy)

    return when {
        absDx < cellSize && absDy < cellSize -> Direction.NONE
        absDx > absDy && dx > 0 -> Direction.RIGHT
        absDx > absDy -> Direction.LEFT
        dy > 0 -> Direction.DOWN
        else -> Direction.UP
    }
}
```

## What we achieved

We successfully implemented:

- A maze generator using the DFS algorithm.
- A visualization of the maze with Canvas.
- Basic player interaction.

You can find the complete code for this project on [Github](https://github.com/puntogris/neon-maze).

![Maze](https://raw.githubusercontent.com/puntogris/neon-maze/refs/heads/master/screenshots/2.webp)

$(document).ready(function() {

  var canvas = $('<canvas>'),
      ctx = canvas[0].getContext('2d'),
      score = 0,
      level = 0,
      direction = 0,
      snake = new Array(3);

  canvas.attr('width', 204);
  canvas.attr('height', 224);

  $('body').append(canvas);

  var map = new Array(20);
  for (var i = 0; i < map.length; i++) {
    map[i] = new Array(20);
  }

  map = generateSnake(map);
  map = generateFood(map);
  drawGame();

  function drawMain() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';

    ctx.strokeRect(2, 20, canvas.attr('width') - 4, canvas.attr('height') - 24);

    ctx.font = '12px sans-serif';
    ctx.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
  }

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMain();

    // Start cycling the matrix
    for (var x = 0; x < map.length; x++) {
      for (var y = 0; y < map[0].length; y++) {
        if (map[x][y] === 1) {
          ctx.fillStyle = 'black';
          ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
        } else if (map[x][y] === 2) {
          ctx.fillStyle = 'orange';
          ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
        }
      }
    }
  }

  function generateFood(map) {
    var rndX = Math.round(Math.random() * 19),
        rndY = Math.round(Math.random() * 19);

    while (map[rndX][rndY] === 2) {
      rndX = Math.round(Math.random() * 19);
      rndY = Math.round(Math.random() * 19);
    }

    map[rndX][rndY] = 1;
    return map;
  }

  function generateSnake(map) {
    // Generate a random position for the row and the column of the head.
    var rndX = Math.round(Math.random() * 19),
        rndY = Math.round(Math.random() * 19);

    // Let's make sure that we're not out of bounds as we also need to
    // make space to accomodate the other two body pieces
    while ((rndX - snake.length) < 0) {
      rndX = Math.round(Math.random() * 19);
    }

    for (var i = 0; i < snake.length; i++) {
      snake[i] = { x: rndX - i, y: rndY };
      map[rndX - i][rndY] = 2;
    }

    return map;
  }
});
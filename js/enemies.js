function spawnEnemy () {
    var enemy = enemies.getFirstExists(false);
    enemy.reset(GAME_WIDTH - 50, game.rnd.integerInRange(50,GAME_HEIGHT - 50));
    enemy.body.velocity.x = -ENEMY_SPEED;

    enemy.health = ENEMY_HEALTH;
}
function hurtEnemy (enemy, weapon){
    enemy.health -= weapon.damage;
    weapon.kill();
    if(enemy.health <= 0){
        makeExplosion(enemy);
        enemy.kill();
        player.score += 10;
        scoreText.text = 'Score: ' + player.score;
    }
}

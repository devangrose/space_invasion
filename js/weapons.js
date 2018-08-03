function fireWeapon () {
    if(game.time.now < weaponTimer || player.life <= 0){
        return;
    }

    var weapon;
    if(WEAPONS[currentWeapon].name === 'Laser'){
        weapon = lasers.getFirstExists(false);
        pewpew.play();
    }
    else if(WEAPONS[currentWeapon].name == 'Missle'){
        weapon = missles.getFirstExists(false);
        launch.play();
    }
    
    weapon.reset(player.x + WEAPONS[currentWeapon].offset + 15, player.y + WEAPONS[currentWeapon].offset);
    weapon.body.velocity.x = WEAPONS[currentWeapon].velocity;
    weapon.damage = WEAPONS[currentWeapon].damage;
    weaponTimer = game.time.now + WEAPONS[currentWeapon].timer;
}
function switchWeapon (){
    if(game.time.now < switchTimer){
        return;
    }
    switchTimer = game.time.now + SWITCH_WEAPON_TIMER;
    console.log('switch weapon');
    currentWeapon++;
    currentWeapon = currentWeapon % WEAPONS.length;
    console.log(currentWeapon);
}
function createGroup (group, imageName, maxNum) {

    group.enableBody = true;
    group.physicsBodyType = Phaser.Physics.ARCADE;
    group.createMultiple(maxNum, imageName);
    group.setAll('outOfBoundsKill',true);
    group.setAll('checkWorldBounds',true);
}



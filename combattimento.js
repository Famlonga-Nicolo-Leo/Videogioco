// Sistema di combattimento
function updateCombat(player) {
    if (player.attackCooldown > 0) {
        player.attackCooldown--;
    }
    
    // Aggiorna le hitbox degli attacchi
    if (player.destra) {
        player.attackHitbox.punch = { 
            x: player.x + player.width, 
            y: player.y + 20, 
            width: 30, 
            height: 20 
        };
        player.attackHitbox.kick = { 
            x: player.x + player.width, 
            y: player.y + 40, 
            width: 40, 
            height: 20 
        };
    } else {
        player.attackHitbox.punch = { 
            x: player.x - 30, 
            y: player.y + 20, 
            width: 30, 
            height: 20 
        };
        player.attackHitbox.kick = { 
            x: player.x - 40, 
            y: player.y + 40, 
            width: 40, 
            height: 20 
        };
    }
}


function disegna_attacco(player) {
    if (player.isAttacking) {
        const ctx = myGameArea.context;
        const hitbox = player.attackHitbox[player.attackType];
        ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    }
}


function attack(player, type) {
    if (!player.isAttacking && player.attackCooldown === 0) {
        player.isAttacking = true;
        player.attackType = type;
        player.frameIndex = 0;      // reset animazione attacco
        player.frameTimer = 0;
        checkHit(player);
    }
}


function checkHit(attacker) {
    const defender = (attacker === rettangolo1) ? rettangolo2 : rettangolo1;
    
    if (attacker.isAttacking) {
        const attackHitbox = attacker.attackHitbox[attacker.attackType];
        
        if (attackHitbox.x < defender.x + defender.width &&
            attackHitbox.x + attackHitbox.width > defender.x &&
            attackHitbox.y < defender.y + defender.height &&
            attackHitbox.y + attackHitbox.height > defender.y) {
            
            defender.health -= attacker.attackDamage[attacker.attackType];
            
            const knockback = (attacker === rettangolo1) ? 5 : -5;//knocback sistemato
            defender.x += knockback;
            
            if (defender.x < 0) defender.x = 0;
            if (defender.x + defender.width > myGameArea.canvas.width) {
                defender.x = myGameArea.canvas.width - defender.width;
            }
            
            if (defender.health <= 0) {
                const fine_alert= false
                defender.health = 0;
                if (fine_alert== false)
                    fine_alert== true
                    clearInterval(interval);
                    alert("Game over!");
            }
        }
    }
}

function vita() {
    const ctx = myGameArea.context;
    const barWidth = 200;
    const barHeight = 20;
    const padding = 20;
    
    // Barra del Player 1
    ctx.fillStyle = 'black';
    ctx.fillRect(padding, padding, barWidth, barHeight);
    ctx.fillStyle = 'red';
    const vitap1 = (rettangolo1.health / rettangolo1.maxHealth) * barWidth;
    ctx.fillRect(padding, padding, vitap1, barHeight);
    
    // Barra del Player 2
    ctx.fillStyle = 'black';
    ctx.fillRect(myGameArea.canvas.width - barWidth - padding, padding, barWidth, barHeight);
    ctx.fillStyle = 'green';
    const vitap2 = (rettangolo2.health / rettangolo2.maxHealth) * barWidth;
    ctx.fillRect(myGameArea.canvas.width - barWidth - padding + (barWidth - vitap2), padding, vitap2, barHeight);//vita sistemata 
}
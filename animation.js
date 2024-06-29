document.addEventListener('DOMContentLoaded', function () {
    const floatingImages = document.querySelectorAll('.floating-image');
    floatingImages.forEach(img => {
        let angle = Math.random() * 360;
        let x = 0, y = 0;
        let dx = (Math.random() - 0.9) * 4;
        let dy = (Math.random() - 0.9) * 4;
        let dAngle = Math.random() * 2;

        function updateAnimation() {
            const rect = img.getBoundingClientRect();

            // update
            x += dx;
            y += dy;

            // rebounce
            if (rect.right + dx > window.innerWidth || rect.left + dx < 0) {
                dx = -(dx);

            }
            if (rect.bottom + dy > window.innerHeight || rect.top + dy < 0) {
                dy = -(dy);

            }

            // adding angle
            angle += dAngle;

            // apply
            img.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`

            // continue
            requestAnimationFrame(updateAnimation);
        }
        requestAnimationFrame(updateAnimation);
    });
});

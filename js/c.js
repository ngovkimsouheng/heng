document.addEventListener('DOMContentLoaded', () => {
    const logos = document.querySelectorAll('.gsap-logo');
    const totalLogos = logos.length;
    const animationDuration = 30; // Seconds for one full revolution
    const rotationPerLogo = 360 / totalLogos; // e.g., 360/12 = 30 degrees

    // 1. Set Initial Positions
    logos.forEach((logo, index) => {
        // Calculate the initial rotation angle for the logo
        const initialRotation = rotationPerLogo * index;

        // Apply the rotation transform to place the logo on the circumference
        // The transform-origin property handles the orbit radius (250px)
        gsap.set(logo, {
            rotation: initialRotation,
            opacity: 1 // Make logos visible after initial setup
        });

        // 2. Create the Continuous Orbital Rotation Animation
        gsap.to(logo, {
            rotation: initialRotation + 360, // Rotate 360 degrees more
            duration: animationDuration,
            ease: "none",
            repeat: -1, // Infinite loop
            delay: 0 - (animationDuration / totalLogos) * index, // Staggered start

            // 3. Create the Tumble/Scale/Depth Effect
            // Use an onUpdate function to apply the secondary effect based on progress
            onUpdate: function() {
                // Get the current progress of the infinite rotation (0 to 1)
                const progress = this.progress(); 
                
                // Calculate position on the circle (0 = start, 0.5 = 180 degrees)
                const angle = progress * 360; 
                
                // Use sine wave to simulate smooth scale and tilt (like in the video)
                // Sine wave ensures smooth transition from front (1) to back (-1)
                const scaleFactor = 1 + (Math.sin(angle * (Math.PI / 180))) * 0.2; // Scale between 0.8 and 1.2
                const tiltAngle = (Math.cos(angle * (Math.PI / 180))) * 20; // Tilt between -20 and 20 degrees
                const opacityFactor = 0.7 + (Math.sin(angle * (Math.PI / 180))) * 0.3; // Opacity between 0.4 and 1.0

                // Apply the secondary 3D effect: rotateX causes the tumble/depth
                gsap.set(logo, {
                    scale: scaleFactor,
                    opacity: opacityFactor,
                    
                    // The tilt effect that makes it tumble toward/away from the viewer
                    rotationX: tiltAngle, 
                    
                    // The Z-index simulates depth for correct layering
                    zIndex: Math.round(50 + (Math.sin(angle * (Math.PI / 180))) * 50) 
                });
            }
        });
    });
});
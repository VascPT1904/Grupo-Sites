'use strict';

/**
 * Represents a drawing object.
 * @abstract
 */
class DrawingObjects {
    /**
     * Creates a new DrawingObjects instance.
     * @abstract
     * @constructor
     * @param {number} px - The x-coordinate of the object's position.
     * @param {number} py - The y-coordinate of the object's position.
     * @param {string} c - The color of the object.
     * @param {string} name - The name of the object.
     */
    constructor(px, py, c, name) {
        // Check if the current instance is of the abstract class itself.
        if (this.constructor === DrawingObjects) {
            // Error Type 1. Abstract class cannot be constructed.
            throw new TypeError('Can not construct abstract class.');
        }

        // Otherwise, this constructor is called from a child class.

        // Check if the child class has implemented the "draw" method.
        if (this.draw === DrawingObjects.prototype.draw) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError('Please implement abstract method draw.');
        }

        // Check if the child class has implemented the "mouseOver" method.
        if (this.mouseOver === DrawingObjects.prototype.mouseOver) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError('Please implement abstract method mouseOver.');
        }

        // Initialize the position and name properties.
        this.posx = px;
        this.posy = py;
        this.color = c;
        this.name = name;
    }
    
    /**
     * Abstract method that should be implemented by child classes to draw the object on the canvas.
     * @param {CanvasRenderingContext2D} cnv - The canvas context where the object will be drawn.
     * @throws {TypeError} - This method should not be called from child classes.
     */
    draw(cnv) {
        // Error Type 6. The child has implemented this method but also called super.foo().
        throw new TypeError('Do not call the abstract method draw from child.');
    }

    /**
     * Abstract method that should be implemented by child classes to handle mouse over events.
     * @param {number} mx - The x coordinate of the mouse pointer.
     * @param {number} my - The y coordinate of the mouse pointer.
     * @abstract
     */
    mouseOver(mx, my) {
        // Error Type 6. The child has implemented this method but also called super.foo().
        throw new TypeError('Do not call the abstract method mouseOver from child.');
    }

    // Helper method to calculate the square of the distance between two points.
    /**
     * Calculates the squared distance between two points.
     * @param {number} px1 - The x-coordinate of the first point.
     * @param {number} py1 - The y-coordinate of the first point.
     * @param {number} px2 - The x-coordinate of the second point.
     * @param {number} py2 - The y-coordinate of the second point.
     * @returns {number} The squared distance between the two points.
     */
    sqDist(px1, py1, px2, py2) {
        const xd = px1 - px2;
        const yd = py1 - py2;

        return ((xd * xd) + (yd * yd));
    }
    setPos(px,py){
        this.posx = px;
        this.posy = py;
    }

}


/**
 * Represents a rectangle object that can be drawn on a canvas.
 * @extends DrawingObjects
 */
class Rect extends DrawingObjects {
    /**
     * Creates a new instance of the Rect class.
     * @constructor
     * @param {number} px - The x-coordinate of the top-left corner of the rectangle.
     * @param {number} py - The y-coordinate of the top-left corner of the rectangle.
     * @param {number} w - The width of the rectangle.
     * @param {number} h - The height of the rectangle.
     * @param {string} c - The color of the rectangle.
     */
    constructor(px, py, w, h, c) {
        // Call the constructor of the parent class (DrawingObjects) with the specified parameters.
        super(px, py, c, 'R');
        // Set the width, height, and color properties for the Rect instance.
        this.w = w;
        this.h = h;
    }

    /**
     * Draws a filled rectangle on the canvas at the specified position with the specified width and height.
     * @param {HTMLCanvasElement} cnv - The canvas element to draw on.
     * @returns {void}
     */
    draw(cnv) {
        // Get the 2D rendering context for the canvas.
        const ctx = cnv.getContext('2d');

        // Set the fill color to the specified color for the rectangle.
        ctx.fillStyle = this.color;

        // Draw a filled rectangle on the canvas at the specified position (this.posx, this.posy)
        // with the specified width (this.w) and height (this.h).
        ctx.fillRect(this.posx, this.posy, this.w, this.h);
    }

    /**
     * Checks if the mouse coordinates are within the boundaries of the rectangle.
     * @param {number} mx - The x-coordinate of the mouse pointer.
     * @param {number} my - The y-coordinate of the mouse pointer.
     * @returns {boolean} True if the mouse is over the rectangle, false otherwise.
     */
    mouseOver(mx, my) {
        // Check if the mouse coordinates (mx, my) are within the boundaries of the rectangle.
        return (
            (mx >= this.posx) &&
            (mx <= (this.posx + this.w)) &&
            (my >= this.posy) &&
            (my <= (this.posy + this.h))
        );
    }
}

/**
 * Represents a picture object that can be drawn on a canvas.
 * @extends DrawingObjects
 */
class Picture extends DrawingObjects {
    /**
     * Creates a new Picture object.
     * @constructor
     * @param {number} px - The x-coordinate of the picture.
     * @param {number} py - The y-coordinate of the picture.
     * @param {number} w - The width of the picture.
     * @param {number} h - The height of the picture.
     * @param {string} impath - The path to the image file.
     */
    constructor(px, py, w, h, impath) {
        // Call the constructor of the parent class (DrawingObjects) with the specified parameters.
        super(px, py, null, 'P');
        // Set the width, height, image path, and create an Image object for the Picture instance.
        this.w = w;
        this.h = h;
        this.impath = impath;
        this.imgobj = new Image();
        this.imgobj.src = this.impath;
    }

    /**
     * Draws the image object on the canvas at the specified position and dimensions.
     * If the image is not yet loaded, it adds a load event listener to handle drawing when the image is ready.
     *
     * @param {HTMLCanvasElement} cnv - The canvas element to draw on.
     * @returns {void}
     */
    draw(cnv) {
        // Get the 2D rendering context for the canvas.
        const ctx = cnv.getContext('2d');

        // Check if the image is already loaded and complete.
        if (this.imgobj.complete) {
            // If the image is loaded, draw it on the canvas at the specified position (this.posx, this.posy)
            // with the specified width (this.w) and height (this.h).
            ctx.drawImage(this.imgobj, this.posx, this.posy, this.w, this.h);
        } else {
            // If the image is not yet loaded, add a load event listener to handle drawing when the image is ready.
            // Using a reference to the current instance (self) to access it inside the event listener function.
            const self = this;
            this.imgobj.addEventListener('load', function () {
                // Draw the image on the canvas once it's loaded, using the specified position and dimensions.
                ctx.drawImage(self.imgobj, self.posx, self.posy, self.w, self.h);
            }, false);
        }
    }

    /**
     * Checks if the given mouse coordinates are within the boundaries of the image.
     * @param {number} mx - The x-coordinate of the mouse.
     * @param {number} my - The y-coordinate of the mouse.
     * @returns {boolean} - True if the mouse is within the boundaries of the image, false otherwise.
     */
    mouseOver(mx, my) {
        // Check if the mouse coordinates (mx, my) are within the boundaries of the image.
        return (
            (mx >= this.posx) &&
            (mx <= (this.posx + this.w)) &&
            (my >= this.posy) &&
            (my <= (this.posy + this.h))
        );
    }
}

/**
 * Represents an oval shape that can be drawn on a canvas.
 * @extends DrawingObjects
 */
class Oval extends DrawingObjects {
    /**
     * Creates a new instance of the Oval class.
     * @constructor
     * @param {number} px - The x-coordinate of the center of the oval.
     * @param {number} py - The y-coordinate of the center of the oval.
     * @param {number} r - The radius of the oval.
     * @param {number} hs - The horizontal scaling factor of the oval.
     * @param {number} vs - The vertical scaling factor of the oval.
     * @param {string} c - The fill color for the oval.
     */
    constructor(px, py, r, hs, vs, c) {
        // Call the constructor of the parent class (DrawingObjects) with specified parameters.
        super(px, py, c, 'O');
        // Set the radius, horizontal scaling factor, vertical scaling factor, and color for the Oval instance.
        this.r = r;
        this.radsq = r * r; // Square of the radius (used for mouse-over check)
        this.hor = hs; // Horizontal scaling factor
        this.ver = vs; // Vertical scaling factor
    }

    /**
     * Checks if the mouse is over the oval object.
     * @param {number} mx - The x-coordinate of the mouse.
     * @param {number} my - The y-coordinate of the mouse.
     * @returns {boolean} - True if the mouse is over the oval object, false otherwise.
     */
    mouseOver(mx, my) {
        // Define two points: (x1, y1) is the center of the oval, and (x2, y2) is the mouse coordinates scaled by hor and ver.
        const x1 = 0;
        const y1 = 0;
        const x2 = (mx - this.posx) / this.hor;
        const y2 = (my - this.posy) / this.ver;

        // Check if the mouse coordinates are within the oval by comparing the distance squared to the square of the radius.
        return (this.sqDist(x1, y1, x2, y2) <= this.radsq);
    }

    /**
     * Draws an oval on the canvas.
     * @param {HTMLCanvasElement} cnv - The canvas element to draw on.
     */
    draw(cnv) {
        const ctx = cnv.getContext('2d');

        // Save the current canvas state to isolate transformations and styles.
        ctx.save();
        ctx.translate(this.posx, this.posy); // Translate the origin to the oval's position.
        ctx.scale(this.hor, this.ver); // Scale the canvas horizontally and vertically.

        // Set the fill color for the oval.
        ctx.fillStyle = this.color;

        // Begin a path for the oval, draw it as an arc at the transformed origin (0, 0) with the specified radius (this.r).
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI, true);
        ctx.closePath(); // Close the path to create a filled oval shape.
        ctx.fill(); // Fill the oval with the specified color.

        // Restore the canvas state to its previous state, undoing the translations and scaling.
        ctx.restore();
    }
}

/**
 * Represents a heart shape object that can be drawn on a canvas.
 * @extends DrawingObjects
 */
class Heart extends DrawingObjects {
    /**
     * Creates a new instance of DrawingObjects with specified parameters.
     * @constructor
     * @param {number} px - The x-coordinate of the object.
     * @param {number} py - The y-coordinate of the object.
     * @param {number} w - The width of the object.
     * @param {string} c - The fill color for the heart.
     */
    constructor(px, py, w, c) {
        // Call the constructor of the parent class (DrawingObjects) with specified parameters.
        super(px, py, c, 'H');
        // Set the height of the heart, half width, square of the radius, angle, and color.
        this.h = w * 0.7; // Height
        this.drx = w / 4; // Half of the width (radius)
        this.radsq = this.drx * this.drx; // Square of the radius (used for mouse-over check)
        this.ang = 0.25 * Math.PI; // Angle for drawing the arcs
    }

    /**
     * Checks if a point is outside the specified bounding box.
     * @param {number} x - The x-coordinate of the top-left corner of the bounding box.
     * @param {number} y - The y-coordinate of the top-left corner of the bounding box.
     * @param {number} w - The width of the bounding box.
     * @param {number} h - The height of the bounding box.
     * @param {number} mx - The x-coordinate of the point to check.
     * @param {number} my - The y-coordinate of the point to check.
     * @returns {boolean} - True if the point is outside the bounding box, false otherwise.
     */
    outside(x, y, w, h, mx, my) {
        // Check if a point (mx, my) is outside the specified bounding box (x, y, w, h).
        return mx < x || mx > x + w || my < y || my > y + h;
    }

    /**
     * Draws a heart shape on the given canvas context.
     * @param {CanvasRenderingContext2D} cnv - The canvas context to draw on.
     */
    draw(cnv) {
        const ctx = cnv.getContext('2d');

        // Calculate the positions of control points and the tip of the heart.
        const leftctrx = this.posx - this.drx;
        const rightctrx = this.posx + this.drx;
        const cx = rightctrx + this.drx * Math.cos(this.ang);
        const cy = this.posy + this.drx * Math.sin(this.ang);

        // Set the fill color for the heart.
        ctx.fillStyle = this.color;

        // Begin drawing the heart shape with arcs and lines.
        ctx.beginPath();
        ctx.moveTo(this.posx, this.posy); // Move to the starting point.

        // Draw the left half of the heart using an arc.
        ctx.arc(leftctrx, this.posy, this.drx, 0, Math.PI - this.ang, true);

        // Continue to the bottom point of the heart and then to the tip.
        ctx.lineTo(this.posx, this.posy + this.h);
        ctx.lineTo(cx, cy);

        // Draw the right half of the heart using another arc.
        ctx.arc(rightctrx, this.posy, this.drx, this.ang, Math.PI, true);

        ctx.closePath(); // Close the path to complete the heart shape.
        ctx.fill(); // Fill the heart shape with the specified color.
    }

    /**
     * Checks if the given point is inside the heart shape.
     * @param {number} mx - The x-coordinate of the point to check.
     * @param {number} my - The y-coordinate of the point to check.
     * @returns {boolean} - True if the point is inside the heart shape, false otherwise.
     */
    mouseOver(mx, my) {
        // Define the positions and dimensions for the bounding rectangle.
        const leftctrx = this.posx - this.drx;
        const rightctrx = this.posx + this.drx;
        const qx = this.posx - 2 * this.drx;
        const qy = this.posy - this.drx;
        const qwidth = 4 * this.drx;
        const qheight = this.drx + this.h;

        // Define two points for comparison (x2, y2) and the slope (m).
        const x2 = this.posx;
        const y2 = this.posy + this.h;
        let m = this.h / (2 * this.drx);

        // Quick test to check if the point is outside the bounding rectangle.
        if (this.outside(qx, qy, qwidth, qheight, mx, my)) {
            return false;
        }

        // Compare the point to the two circle centers of the heart.
        if (this.sqDist(mx, my, leftctrx, this.posy) < this.radsq) return true;
        if (this.sqDist(mx, my, rightctrx, this.posy) < this.radsq) return true;

        // If the point is above the heart and outside the circles, return false.
        if (my <= this.posy) return false;

        // Compare the point to the slopes of the left and right sides of the heart.
        if (mx <= this.posx) {
            return my < m * (mx - x2) + y2;
        } else { // Right side
            m = -m;
            return my < m * (mx - x2) + y2;
        }
    }
}

//TO DO: You may need to add more classes other than the following two (e.g., a third new object type and a text object).
class Bear extends DrawingObjects
{
    constructor (px,py,color) {
        super(px, py,color, 'B');
        
        
        this.circle1 = new Oval(px+50, py+50, 40,1.1,1, color);
        
        this.circle2 = new Oval(px+20, py+20, 20,1,1, color); //orelha esquerda
        this.circle3 = new Oval(px+20, py+20, 10,1,1, '#000000');

        this.circle4 = new Oval(px+80, py+20, 20,1,1, color); //orelha direita
        this.circle5 = new Oval(px+80, py+20, 10,1,1, '#000000');

        this.circle6 = new Oval(px+34, py+38, 2,1,1, color); //olho direito
        this.circle7 = new Oval(px+35, py+40, 5,1,1, '#000000');

        this.circle8 = new Oval(px+64, py+38, 2,1,1, color); //olho esquerdo
        this.circle9 = new Oval(px+65, py+40, 5,1,1, '#000000');

        this.circle10 = new Oval(px+43, py+50, 3,1,1, color); //nariz
        this.circle11 = new Oval(px+50, py+55, 10,1.40,1, '#000000');
    }

    mouseOver(mx, my) {
        // Verificar se o mouse está sobre qualquer parte do urso
        return (
            this.circle1.mouseOver(mx, my) ||
            this.circle2.mouseOver(mx, my) ||
            this.circle3.mouseOver(mx, my) ||
            this.circle4.mouseOver(mx, my) ||
            this.circle5.mouseOver(mx, my) ||
            this.circle6.mouseOver(mx, my) ||
            this.circle7.mouseOver(mx, my) ||
            this.circle8.mouseOver(mx, my) ||
            this.circle9.mouseOver(mx, my) ||
            this.circle10.mouseOver(mx, my) ||
            this.circle11.mouseOver(mx, my)
            );
        }
        setPos(px, py) {
            super.setPos(px, py);
            this.circle1.setPos(this.posx + 50, this.posy + 50);
            this.circle2.setPos(this.posx + 20, this.posy + 20);
            this.circle3.setPos(this.posx + 20, this.posy + 20);
            this.circle4.setPos(this.posx + 80, this.posy + 20);
            this.circle5.setPos(this.posx + 80, this.posy + 20);
            this.circle6.setPos(this.posx + 34, this.posy + 38);
            this.circle7.setPos(this.posx + 35, this.posy + 40);
            this.circle8.setPos(this.posx + 64, this.posy + 38);
            this.circle9.setPos(this.posx + 65, this.posy + 40);
            this.circle10.setPos(this.posx + 43, this.posy + 50);
            this.circle11.setPos(this.posx + 50, this.posy+55);
    }
        
    

    draw(cnv) {
        this.circle1.color= this.color;
        this.circle2.color= this.color;
        this.circle4.color= this.color;
        this.circle6.color= this.color;
        this.circle8.color= this.color;
        this.circle10.color= this.color;
        
        this.circle2.draw(cnv);
        this.circle3.draw(cnv);
        this.circle4.draw(cnv);
        this.circle5.draw(cnv);
        this.circle1.draw(cnv);
        this.circle7.draw(cnv);
        this.circle6.draw(cnv);
        this.circle9.draw(cnv);
        this.circle8.draw(cnv);
        this.circle11.draw(cnv);
        this.circle10.draw(cnv);
        
        const ctx = cnv.getContext('2d');
        const mouthRadius = 10;
        
        ctx.beginPath();
        ctx.arc(this.posx + 39, this.posy + 63, mouthRadius, 0, Math.PI, false); // Left semicircle
        ctx.fillStyle = '#000000';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(this.posx + 58 , this.posy + 63, mouthRadius, 0, Math.PI, false); // Right semicircle
        ctx.fillStyle = '#000000';
        ctx.stroke();
        
    }
}
class Ghost extends DrawingObjects {
    constructor(px, py,color) {
        super(px, py, color, 'G');
        
    }

    mouseOver(mx, my) {
        
        const headCenterX = (292 + this.posx)*0.8 ; 
        const headCenterY = (78 + this.posy)*0.8 ;
        const distance = Math.sqrt(this.sqDist(mx,my,headCenterX,headCenterY));

        
        return distance <= 50;
    }

    draw(cnv) {
        const ctx = cnv.getContext('2d');

        const scale = 0.8;

        // Cabeça
        ctx.beginPath();
        ctx.moveTo((222 + this.posx) * scale, (60 + this.posy) * scale);
        ctx.quadraticCurveTo((222 + this.posx) * scale, (18 + this.posy) * scale, (264 + this.posx) * scale, (18 + this.posy) * scale);
        ctx.lineTo((318 + this.posx) * scale, (18 + this.posy) * scale);
        ctx.quadraticCurveTo((360 + this.posx) * scale, (18 + this.posy) * scale, (360 + this.posx) * scale, (60 + this.posy) * scale);
        ctx.lineTo((360 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.lineTo((222 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();

        // Olhos
        ctx.beginPath();
        ctx.arc((246 + this.posx) * scale, (66 + this.posy) * scale, 16 * scale, 0, Math.PI * 2);
        ctx.arc((318 + this.posx) * scale, (66 + this.posy) * scale, 16 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.arc((243 + this.posx) * scale, (70 + this.posy) * scale, 5.28 * scale, 0, Math.PI * 2);
        ctx.arc((314 + this.posx) * scale, (70 + this.posy) * scale, 5.28 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();

        // Pés
        ctx.beginPath();
        ctx.moveTo((222 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.lineTo((242 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.lineTo((222 + this.posx) * scale, (126 + this.posy) * scale);
        ctx.closePath();
        ctx.fillStyle = '#cccccc';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo((240 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.lineTo((282 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.lineTo((261 + this.posx) * scale, (126 + this.posy) * scale);
        ctx.closePath();
        ctx.fillStyle = '#cccccc';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo((282 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.lineTo((324 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.lineTo((305 + this.posx) * scale, (126 + this.posy) * scale);
        ctx.closePath();
        ctx.fillStyle = '#cccccc';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo((324 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.lineTo((360 + this.posx) * scale, (96 + this.posy) * scale);
        ctx.lineTo((360 + this.posx) * scale, (126 + this.posy) * scale);
        ctx.closePath();
        ctx.fillStyle = '#cccccc';
        ctx.fill();
    }
}


class T extends DrawingObjects{

    constructor (px,py,color) {
        super(px, py,color, 'T');
        this.color=color;
        this.rect1=new Rect(px+32,py,25,90,color);
        this.rect2=new Rect(px,py,90,25,color);
        this.rect3=new Rect(px+32,py,15,90,'#000000');
        this.rect4=new Rect(px,py,90,15,'#000000');
        

    }

    mouseOver(mx, my) {
        return (
            this.rect1.mouseOver(mx, my) ||
            this.rect2.mouseOver(mx, my) ||
            this.rect3.mouseOver(mx, my) ||
            this.rect4.mouseOver(mx, my)
            );
    }

    draw(cnv) {
        this.rect1.color = this.color;
        this.rect2.color = this.color;
        this.rect3.color = '#000000';
        this.rect4.color = '#000000';
        
        this.rect1.draw(cnv);
        this.rect2.draw(cnv);
        this.rect3.draw(cnv);
        this.rect4.draw(cnv);
    }
    setPos(px,py){
        super.setPos(px,py);
        this.rect1.setPos(this.posx + 32, this.posy);
        this.rect2.setPos(this.posx, this.posy);
        this.rect3.setPos(this.posx + 32, this.posy);
        this.rect4.setPos(this.posx, this.posy);
}

}

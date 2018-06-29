var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Good mert: Sliders
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

/**
 *
 * Welcome to Good mert, Sliders
 *
 * Click, drag, release to slide a new mert.
 *
 */

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// image
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var mert_IMG = document.createElement('img');
mert_IMG.src = 'https://pbs.twimg.com/profile_images/991580825669001221/lrh-vUg7_400x400.jpg';
var IMAGE_LOADED = false;
mert_IMG.addEventListener('load', function () {
    IMAGE_LOADED = true;
});

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// utils
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Point
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Point = function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: 'delta',
        value: function delta(point) {
            return [this.x - point.x, this.y - point.y];
        }
    }, {
        key: 'distance',
        value: function distance(point) {
            var dx = point.x - this.x;
            var dy = point.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }, {
        key: 'applyVelocity',
        value: function applyVelocity(velocity) {
            this.x += velocity.vx;
            this.y += velocity.vy;
            return this;
        }
    }, {
        key: 'angleRadians',
        value: function angleRadians(point) {
            // radians = atan2(deltaY, deltaX)
            var y = point.y - this.y;
            var x = point.x - this.x;
            return Math.atan2(y, x);
        }
    }, {
        key: 'angleDeg',
        value: function angleDeg(point) {
            // degrees = atan2(deltaY, deltaX) * (180 / PI)
            var y = point.y - this.y;
            var x = point.x - this.x;
            return Math.atan2(y, x) * (180 / Math.PI);
        }
    }, {
        key: 'position',
        get: function get() {
            return {
                x: this.x,
                y: this.y
            };
        },
        set: function set(_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                x = _ref2[0],
                y = _ref2[1];

            this.x = x;
            this.y = y;
        }
    }]);

    return Point;
}();

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Velocity
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Velocity = function () {
    function Velocity(vx, vy) {
        _classCallCheck(this, Velocity);

        this.vx = vx;
        this.vy = vy;
    }

    _createClass(Velocity, [{
        key: 'flip',
        value: function flip() {
            this.vx *= -1;
            this.vy *= -1;
            return this;
        }
    }, {
        key: 'flipX',
        value: function flipX() {
            this.vx *= -1;
            return this;
        }
    }, {
        key: 'flipY',
        value: function flipY() {
            this.vy *= -1;
            return this;
        }
    }, {
        key: 'multiply',
        value: function multiply(scalar) {
            this.vx *= scalar;
            this.vy *= scalar;
            return this;
        }
    }, {
        key: 'divide',
        value: function divide(scalar) {
            this.vx /= scalar;
            this.vy /= scalar;
            return this;
        }
    }]);

    return Velocity;
}();

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Emoji
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Emoji = function () {
    function Emoji(position, size, img) {
        var _this = this;

        _classCallCheck(this, Emoji);

        this.draw = function (_ref3) {
            var ctx = _ref3.ctx,
                x = _ref3.x,
                y = _ref3.y;

            ctx.drawImage(_this.ctx.canvas, x, y, _this.ctx.canvas.width, _this.ctx.canvas.height);
        };

        this.position = position;
        this.size = size;
        this.img = img;
        this.ctx = document.createElement('canvas').getContext('2d');
        this.ctx.canvas.width = this.size;
        this.ctx.canvas.height = this.size;

        this.drawCanvas();
    }

    _createClass(Emoji, [{
        key: 'drawCanvas',
        value: function drawCanvas() {
            this.ctx.clearRect(0, 0, this.size, this.size);
            this.ctx.drawImage(this.img, 0, 0, this.size, this.size);
        }
    }]);

    return Emoji;
}();

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Element
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Element = function Element() {
    var _this2 = this;

    _classCallCheck(this, Element);

    this.dpr = window.devicePixelRatio || 1;

    this.toValue = function (value) {
        return value * _this2.dpr;
    };

    this.draw = function () {};

    this.update = function () {};
};

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Explosion
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Explosion = function (_Element) {
    _inherits(Explosion, _Element);

    function Explosion(power, multiplier, center) {
        _classCallCheck(this, Explosion);

        var _this3 = _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this));

        _this3.update = function () {
            _this3.r += _this3.power;
            _this3.power *= 0.95;

            if (_this3.power < 0.01) {
                _this3.dead = true;
            }
        };

        _this3.draw = function (_ref4) {
            var ctx = _ref4.ctx;

            _this3.drawShockWave(ctx, _this3.r);
            // this.drawShockWave(ctx, this.r + 3);
            // this.drawShockWave(ctx, this.r + 6);
        };

        _this3.center = center;
        _this3.power = power; // should be from 1 - 0
        _this3.color = '#4963cc';
        _this3.r = _this3.toValue(1);
        _this3.pi = Math.PI;
        _this3.pi2 = _this3.pi * 2;
        _this3.opacity = 0.5;
        _this3.multiplier = multiplier;
        _this3.dead = false;
        return _this3;
    }

    _createClass(Explosion, [{
        key: 'drawShockWave',
        value: function drawShockWave(ctx, r) {
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = this.opacity * this.power;
            ctx.globalCompositeOperation = 'lighter';
            ctx.lineWidth = this.toValue((1 - this.power) * this.multiplier - r);

            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, r * this.multiplier, 0, this.pi2, true);
            ctx.closePath();
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';
        }
    }]);

    return Explosion;
}(Element);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// mert
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var mert = function (_Element2) {
    _inherits(mert, _Element2);

    function mert(_ref5) {
        var center = _ref5.center,
            radius = _ref5.radius,
            velocity = _ref5.velocity,
            id = _ref5.id,
            emoji = _ref5.emoji;

        _classCallCheck(this, mert);

        var _this4 = _possibleConstructorReturn(this, (mert.__proto__ || Object.getPrototypeOf(mert)).call(this));

        _this4.updateVelocity = function (bounds, elements) {
            // bounds collision
            // horiz
            if (_this4.center.x + _this4.radius >= bounds.x + bounds.width) {
                _this4.center.x = bounds.x + bounds.width - _this4.radius;
                _this4.velocity.flipX();
                _this4.collisionSound();
            } else if (_this4.center.x - _this4.radius <= bounds.x) {
                _this4.center.x = bounds.x + _this4.radius;
                _this4.velocity.flipX();
                _this4.collisionSound();
            }
            // vert
            if (_this4.center.y + _this4.radius >= bounds.y + bounds.height) {
                _this4.center.y = bounds.y + bounds.height - _this4.radius;
                _this4.velocity.flipY();
                _this4.collisionSound();
            } else if (_this4.center.y - _this4.radius <= bounds.y) {
                _this4.center.y = bounds.y + _this4.radius;
                _this4.velocity.flipY();
                _this4.collisionSound();
            }

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                if (element instanceof mert && element.id !== _this4.id) {
                    // Circle To Circle Collision
                    var dx = _this4.center.x - element.center.x;
                    var dy = _this4.center.y - element.center.y;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    var minDistance = element.radius + _this4.radius;

                    if (distance < minDistance) {
                      
                        var tangent = Math.atan2(dy, dx);

                        var spread = minDistance - distance;
                        var ax = spread * Math.cos(tangent);
                        var ay = spread * Math.sin(tangent);

                        // solve collision (separation)
                        _this4.center.x += ax;
                        _this4.center.y += ay;
                        element.x -= ax;
                        element.y -= ay;

                        // give a punch to the speed
                        var punch = _this4.toValue(2);

                        _this4.velocity.vx += punch * Math.cos(tangent);
                        _this4.velocity.vy += punch * Math.sin(tangent);
                        element.velocity.vx -= punch * Math.cos(tangent);
                        element.velocity.vy -= punch * Math.sin(tangent);

                        _this4.collisionSound();

                        break;
                    }
                }
            }

            _this4.velocity.multiply(_this4.friction);
        };

        _this4.draw = function (_ref6) {
            var ctx = _ref6.ctx;

            // ctx.beginPath();
            // ctx.arc(
            //     this.center.x,
            //     this.center.y,
            //     this.radius,
            //     0,
            //     2 * Math.PI,
            //     false
            // );
            // ctx.fillStyle = 'transparent';
            // ctx.fill();
            // ctx.lineWidth = this.toValue(2);
            // ctx.strokeStyle = '#ff00ff';
            // ctx.stroke();

            _this4.emoji.draw({
                ctx: ctx,
                x: _this4.center.x - _this4.radius,
                y: _this4.center.y - _this4.radius
            });
        };

        _this4.update = function (_ref7) {
            var elements = _ref7.elements,
                bounds = _ref7.bounds;

            _this4.center.applyVelocity(_this4.velocity);
            _this4.updateVelocity(bounds, elements);
        };

        _this4.emoji = emoji;
        _this4.center = center;
        _this4.radius = radius;
        _this4.velocity = velocity;
        _this4.mass = _this4.radius * 2;
        _this4.friction = 0.995;
        _this4.id = id;
        return _this4;
    }

    _createClass(mert, [{
        key: 'circleToCircleCollision',
        value: function circleToCircleCollision(circle) {
            var dx = this.center.x - circle.center.x;
            var dy = this.center.y - circle.center.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < circle.radius + this.radius) {
                return true;
            }
            return false;
        }
    }, {
        key: 'collisionSound',
        value: function collisionSound() {
            var freq = 120 + Math.random() * 50;
            // sound.play(freq, 0.1, 0.1);
            // sound.play(freq, 0.1, 0.2);
        }
    }]);

    return mert;
}(Element);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Sling
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Sling = function (_Element3) {
    _inherits(Sling, _Element3);

    function Sling() {
        _classCallCheck(this, Sling);

        var _this5 = _possibleConstructorReturn(this, (Sling.__proto__ || Object.getPrototypeOf(Sling)).call(this));

        _this5.draw = function (_ref8) {
            var ctx = _ref8.ctx,
                mouse = _ref8.mouse,
                addElement = _ref8.addElement;

            if (_this5.mousedown) {
                _this5.drawPoint({ ctx: ctx, mouse: mouse });
                _this5.drawVector({ ctx: ctx, mouse: mouse });
                _this5.drawPower({ ctx: ctx, mouse: mouse });
            }
            _this5.element && _this5.addmert({ addElement: addElement, mouse: mouse });
        };

        _this5.update = function (_ref9) {
            var ctx = _ref9.ctx,
                mouse = _ref9.mouse,
                addElement = _ref9.addElement,
                tick = _ref9.tick;

            if (tick < 300 && tick % 30 === 0 && !_this5.interaction && IMAGE_LOADED) {
                _this5.addmert({ mouse: mouse, addElement: addElement });
            }
        };

        _this5.mouseDown = false;
        _this5.start = null;
        _this5.elementId = 0;
        _this5.interaction = false;

        ['mousedown', 'touchstart'].forEach(function (event, touch) {
            window.addEventListener(event, function (e) {
                _this5.interaction = true;
                _this5.mousedown = true;
                var x = touch ? e.targetTouches[0].clientX * _this5.dpr : e.clientX * _this5.dpr;
                var y = touch ? e.targetTouches[0].clientY * _this5.dpr : e.clientY * _this5.dpr;
                _this5.start = new Point(x, y);
            }, false);
        });
        ['mouseup', 'touchend'].forEach(function (event, touch) {
            window.addEventListener(event, function (e) {
                _this5.element = true;
                _this5.mousedown = false;
            }, false);
        });
        return _this5;
    }

    _createClass(Sling, [{
        key: 'addmert',
        value: function addmert(_ref10) {
            var addElement = _ref10.addElement,
                mouse = _ref10.mouse;

            var hw = this.toValue(window.innerWidth / 2);
            var hh = this.toValue(window.innerHeight / 2);
            var offX = hw / 20;
            var offY = hh / 20;
            var maxSize = hw / 10;
            var minSize = hw / 20;
            var rx = getRandomInt(hw - offX, hw + offX);
            var ry = getRandomInt(hh - offY, hh + offY);
            var rr = getRandomInt(maxSize, minSize);

            var start = this.start ? this.start : new Point(rx, ry);
            var radius = this.elementRadius ? this.elementRadius : rr;
            var _mouse = this.start ? mouse : new Point(hw, hh);
            var delta = start.delta(_mouse);

            var element = new mert({
                id: this.elementId,
                center: start,
                radius: radius,
                velocity: new (Function.prototype.bind.apply(Velocity, [null].concat(_toConsumableArray(delta))))().multiply(0.25),
                emoji: new Emoji(new Point(start.x - radius, start.y - radius), radius * 2, mert_IMG)
            });

            addElement(element);
            addElement(new Explosion(0.2, radius, new Point(start.x, start.y)));

            this.element = null;
            this.elementId += 1;

            // const freq = 200 + Math.random() * 50;
            // sound.play(freq, 0.5);
        }
    }, {
        key: 'drawVector',
        value: function drawVector(_ref11) {
            var ctx = _ref11.ctx,
                mouse = _ref11.mouse;

            ctx.strokeStyle = '#fff';
            ctx.strokeWidth = this.toValue(2);
            ctx.beginPath();
            ctx.moveTo(this.start.x, this.start.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }, {
        key: 'drawPower',
        value: function drawPower(_ref12) {
            var ctx = _ref12.ctx,
                mouse = _ref12.mouse;

            this.elementRadius = this.start.distance(mouse) / 4;
            ctx.beginPath();
            ctx.arc(this.start.x, this.start.y, this.elementRadius, 0, 2 * Math.PI, false);
            ctx.lineWidth = this.toValue(2);
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        }
    }, {
        key: 'drawPoint',
        value: function drawPoint(_ref13) {
            var ctx = _ref13.ctx,
                mouse = _ref13.mouse;

            var radius = this.toValue(10);
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, radius, 0, 2 * Math.PI, false);
            ctx.lineWidth = this.toValue(2);
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        }
    }]);

    return Sling;
}(Element);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// ARKAPLAN
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Background = function (_Element4) {
    _inherits(Background, _Element4);

    function Background() {
        var _ref14;

        var _temp, _this6, _ret;

        _classCallCheck(this, Background);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this6 = _possibleConstructorReturn(this, (_ref14 = Background.__proto__ || Object.getPrototypeOf(Background)).call.apply(_ref14, [this].concat(args))), _this6), _this6.draw = function (_ref15) {
            var ctx = _ref15.ctx,
                canvas = _ref15.canvas;

            _this6.drawGradient(ctx, canvas);
            _this6.drawText(ctx, canvas);
        }, _temp), _possibleConstructorReturn(_this6, _ret);
    }

    _createClass(Background, [{
        key: 'drawText',
        value: function drawText(ctx, canvas) {
            ctx.save();
            var ms = Math.max(canvas.width, canvas.height);
            var size = ms / 10;
            ctx.font = '900 italic ' + size + 'px futura-pt, futura, sans-serif';
            ctx.textAlign = 'center';

            var copy = 'MERT CAN ALTIN';
            var x = canvas.width / 2;
            var y = canvas.height / 2 + size / 3;
            var depth = this.toValue(50);
            for (var i = 0; i <= depth; i++) {
                var v = i / depth;
                ctx.fillStyle = 'red';
                ctx.shadowColor = 'hsl(' + (169 + 20 * v) + ', 64%, 60%)';

                ctx.shadowOffsetX = depth - i;
                ctx.shadowOffsetY = depth - i;
                ctx.fillText(copy, x, y);
            }

            ctx.fillStyle = '#fff';
            ctx.fillText(copy, x, y);

            ctx.restore();
        }
    }, {
        key: 'drawGradient',
        value: function drawGradient(ctx, canvas) {
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'red');  //ARKAPLAN RENGİ
            gradient.addColorStop(1, '#95e3e5');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }]);

    return Background;
}(Element);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Canvas
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Canvas = function () {
    function Canvas() {
        var _this7 = this;

        var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Canvas);

        this.setCanvasSize = function () {
            _this7.canvas.width = window.innerWidth * _this7.dpr;
            _this7.canvas.height = window.innerHeight * _this7.dpr;
            _this7.canvas.style.width = window.innerWidth + 'px';
            _this7.canvas.style.height = window.innerHeight + 'px';
            _this7.bounds = {
                x: 0,
                y: 0,
                width: window.innerWidth * _this7.dpr,
                height: window.innerHeight * _this7.dpr
            };
        };

        this.addElement = function (newElement) {
            _this7.elements = [].concat(_toConsumableArray(_this7.elements), [newElement]);
            return _this7.elements.length - 1;
        };

        this.render = function () {
            _this7.draw();
            _this7.update();
            ++_this7.tick;
            window.requestAnimationFrame(_this7.render);
        };

        // setup a canvas
        this.canvas = document.getElementById('canvas');
        this.dpr = window.devicePixelRatio || 1;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(this.dpr, this.dpr);
        this.tick = 0;

        // stuff
        this.elements = elements;
        this.mouse = new Point(window.innerWidth * this.dpr, window.innerHeight * this.dpr);
        this.sling = new Sling();
        // run
        this.setCanvasSize();
        this.setupListeners();
        this.render();
    }

    _createClass(Canvas, [{
        key: 'setupListeners',
        value: function setupListeners() {
            var _this8 = this;

            window.addEventListener('resize', this.setCanvasSize);
            ['mousemove', 'touchmove'].forEach(function (event, touch) {
                window.addEventListener(event, function (e) {
                    if (touch) {
                        e.preventDefault();
                        var x = e.targetTouches[0].clientX * _this8.dpr;
                        var y = e.targetTouches[0].clientY * _this8.dpr;
                        _this8.mouse.position = [x, y];
                    } else {
                        var _x2 = e.clientX * _this8.dpr;
                        var _y = e.clientY * _this8.dpr;
                        _this8.mouse.position = [_x2, _y];
                    }
                }, false);
            });
        }
    }, {
        key: 'removeElement',
        value: function removeElement(deleteIndex) {
            this.elements = this.elements.filter(function (el, i) {
                return i !== deleteIndex;
            });
            return this.elements;
        }
    }, {
        key: 'update',
        value: function update() {
            var _this9 = this;

            this.elements.map(function (_ref16) {
                var update = _ref16.update;
                return update(_this9);
            });
            this.elements = this.elements.filter(function (_ref17) {
                var _ref17$dead = _ref17.dead,
                    dead = _ref17$dead === undefined ? false : _ref17$dead;
                return !dead;
            });
            this.sling.draw(this);
        }
    }, {
        key: 'draw',
        value: function draw() {
            var _this10 = this;

            this.elements.map(function (_ref18) {
                var draw = _ref18.draw;
                return draw(_this10);
            });
            this.sling.update(this);
        }
    }]);

    return Canvas;
}();

var canvas = new Canvas([new Background()]);

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
var MyClass = /** @class */ (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            age: 24
        };
        return _this;
    }
    MyClass.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("p", { className: "App-intro" },
                "I'm ",
                React.createElement("b", null, this.props.name),
                " and I'm ",
                React.createElement("code", null, "developer"),
                " and I'm ",
                React.createElement("i", null, this.renderMarried()),
                " and I'm ",
                React.createElement("u", null, this.state.age),
                "yo")));
    };
    MyClass.prototype.renderMarried = function () {
        return this.props.isMarried ? ("married") : ("not married");
    };
    MyClass.defaultProps = {
        isMarried: false,
        name: "someone",
    };
    return MyClass;
}(React.Component));
export default MyClass;
//# sourceMappingURL=MyClass.js.map
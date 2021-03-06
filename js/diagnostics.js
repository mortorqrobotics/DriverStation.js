var util = require("util");
var events = require("events");

function Diagnostics() {
  events.EventEmitter.call(this);

  this.hookRebootButton();
  this.hookRobotCodeReset();
}

util.inherits(Diagnostics, events.EventEmitter);

/**
 * Listen for reboot button
 */
Diagnostics.prototype.hookRebootButton = function() {
  self = this;
  $('#reboot').click(function() {
    self.emit('reboot');
  });
};

/**
 * Listen for Robot Code reset
 */
Diagnostics.prototype.hookRobotCodeReset = function() {
  self = this;
  $('#diagnostics form').submit(function() {
    var val = $(this).find('input[type=radio]:checked').val();
    if ( ! val)
    {
      return;
    }
    val = (val == 'full');
    self.emit('resetRobotCode', val);
  });
};

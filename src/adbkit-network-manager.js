import _ from 'lodash';
import Promise from 'bluebird';

import ADB from 'adbkit';
import './adbkit-shell-wait';

import Client from 'adbkit/lib/adb/client';
Client.prototype.networkWiFi = async function(serial, options) {
  await this.shellWait(serial, `svc wifi ${options.state ? 'enable' : 'disable'}`);
}
Client.prototype.networkCellular = async function(serial, options) {
  await this.shellWait(serial, `svc data ${options.state ? 'enable' : 'disable'}`);
}
Client.prototype.networkAirplane = async function(serial, options) {  
  await this.shellWait(serial, `settings put global airplane_mode_on ${options.state ? '1' : '0'}`);
  await this.shellWait(serial, `am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true`);
}
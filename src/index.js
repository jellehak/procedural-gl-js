/**
 * Copyright 2020 (c) Felix Palmer
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import CameraExport from '/export/camera';
import ControlsExport from '/export/controls';
import CoreExport from '/export/core';
import DisplayLocationExport from '/export/displayLocation';
import EnvironmentsExport from '/export/environments';
import FeaturesExport from '/export/features';
import PauseExport from '/export/pause';
import LocationExport from '/export/location';
import UserInterfaceExport from '/export/userInterface';

// Entry point into app
import '/views/root.jsx';

import pack from '../package.json';

/*global __buildVersion__*/
console.log( 'Procedural v' + pack.version );

// Re-export public API
const Procedural = {
  ...CameraExport,
  ...ControlsExport,
  ...CoreExport,
  ...DisplayLocationExport,
  ...EnvironmentsExport,
  ...FeaturesExport,
  ...PauseExport,
  ...LocationExport,
  ...UserInterfaceExport
};

// Proxy through setters as destructing won't pass these through
let listeners = [
  'onFeatureClicked',
  'onFeatureSelected',
  'onOverlayAdded'
];
for ( let l of listeners ) {
  Object.defineProperty( Procedural, l, {
    set: fn => FeaturesExport[ l ] = fn
  } );
}

listeners = [
  'onCameraChange'
];
for ( let l of listeners ) {
  Object.defineProperty( Procedural, l, {
    set: fn => CameraExport[ l ] = fn
  } );
}

listeners = [
  'onBoundsFocused',
  'onLocationError',
  'onLocationFocused',
  'onLocationLoaded',
  'onUserInteraction'
];
for ( let l of listeners ) {
  Object.defineProperty( Procedural, l, {
    set: fn => CoreExport[ l ] = fn
  } );
}

export default Procedural;

import {
	OrthographicCamera,
	PlaneBufferGeometry,
	Mesh
} from "three.lib";

function Pass() {

	// if set to true, the pass is processed by the composer
	this.enabled = true;

	// if set to true, the pass indicates to swap read and write buffer after rendering
	this.needsSwap = true;

	// if set to true, the pass clears its buffer before rendering
	this.clear = false;

	// if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
	this.renderToScreen = false;

}

Object.assign( Pass.prototype, {

	setSize( /* width, height */ ) {},

	render( /* renderer, writeBuffer, readBuffer, deltaTime, maskActive */ ) {

		console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );

	}

} );

// Helper for passes that need to fill the viewport with a single quad.

Pass.FullScreenQuad = ( function () {

	var camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	var geometry = new PlaneBufferGeometry( 2, 2 );

	var FullScreenQuad = function ( material ) {

		this._mesh = new Mesh( geometry, material );
		this._camera = camera;

	};

	Object.defineProperty( FullScreenQuad.prototype, 'material', {

		get() {

			return this._mesh.material;

		},

		set( value ) {

			this._mesh.material = value;

		}

	} );

	Object.assign( FullScreenQuad.prototype, {

		dispose() {

			this._mesh.geometry.dispose();

		},

		render( renderer ) {

			renderer.render( this._mesh, camera );

		}
	} );

	return FullScreenQuad;

} )();

export { Pass };

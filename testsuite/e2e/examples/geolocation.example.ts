import { test, expect } from '@playwright/test';

test.use({
	//uses dd coordinates
	geolocation: { longitude: 52.52437, latitude: 13.41053 },
	permissions: ['geolocation'],
});

test('my test with geolocation', async ({ page, context }) => {
	// ...

	// modify the geolocation mid-test; only works when the permission is set in test.use
	// note if not modifying the geolocation mid-test then delete context from the async call above
	await context.setGeolocation({longitude: 29.979097, latitude: 31.134256})

});
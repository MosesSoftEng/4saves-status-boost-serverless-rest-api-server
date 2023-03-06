// Default export a single object.
export default {
	// Payload should be object.
	type: 'object',
	// Specifies data types of objects expected.
	properties: {
		phone: {type: 'string'},
		code: {type: 'string'}
	},
	// Array that  properties required in payload.
	required: ['phone']
} as const; // Object should be readonly.

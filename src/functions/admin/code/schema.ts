export default {
	// Payload should be object.
	type: 'object',
	// Speicifies data types of objects expected.
	properties: {
		phone: {type: 'string'}
	},
	// Array that speicifies properties rquired in payload.
	required: ['phone']
} as const; // Object should be readonly.

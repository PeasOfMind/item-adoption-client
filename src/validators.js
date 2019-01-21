export const required = value => value ? undefined : 'Required';
export const nonEmpty = value => value.trim() === '' ? 'Cannot be empty': undefined;
export const matches = field => (value, allValues) => field in allValues && value.trim() === allValues[field] 
? undefined
: 'Does not match';
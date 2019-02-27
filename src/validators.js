export const required = value => value ? undefined : 'Required';
export const nonEmpty = value => value.trim() === '' ? 'Cannot be empty': undefined;
export const validNum = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const validZip = value => value && value.length !== 5 ? 'Must be a valid zipcode' : undefined;
export const matches = field => (value, allValues) => field in allValues && value.trim() === allValues[field] 
? undefined
: 'Does not match';
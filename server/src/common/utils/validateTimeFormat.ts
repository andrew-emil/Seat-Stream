import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsTimeString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTimeString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          // Matches 00:00 to 23:59
          return typeof value === 'string' && /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Time must be in HH:mm 24-hour format';
        },
      },
    });
  };
} 
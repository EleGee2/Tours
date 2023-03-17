import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE =
  // /^(?=\P{Ll}*\p{Ll})(?=\P{Lu}*\p{Lu})(?=\P{N}*\p{N})(?=[\p{L}\p{N}]*[^\p{L}\p{N}])[\s\S]{8,}$/;
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()_+])[A-Za-z\d@$!%*?&^()_+]{8,}$/;

const PASSWORD_RULE_MESSAGE =
  'Password should have 1 one lowercase, uppercase, number, and symbol';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
});

export const UTIL = {
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  VALIDATION_PIPE,
};

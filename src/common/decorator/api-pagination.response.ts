import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDto } from '../dto/paginated.dto';

interface IPaginatedDecoratorApiResponse {
  model: Type<any>;
  description?: string;
}

export const ApiPaginationResponse = <TModel extends Type<any>>(
  options: IPaginatedDecoratorApiResponse,
) => {
  return applyDecorators(
    ApiOkResponse({
      description: options.description || 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(options.model) },
              },
              meta: {
                type: 'any',
                default: {
                  totalItems: 2,
                  itemCount: 2,
                  itemsPerPage: 2,
                  totalPages: 1,
                  currentPage: 1,
                },
              },
            },
          },
        ],
      },
    }),
  );
};

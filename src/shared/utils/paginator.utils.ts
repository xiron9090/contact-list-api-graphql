import { PaginatorParams } from 'src/core/dto/paginator.params.dto';

export default class PaginatorUtils {
  public static processQueryParams = (
    paginator: PaginatorParams,
  ): PaginatorParams | null => {
    const { page, limit } = paginator;
    if (page && limit && !isNaN(Number(page)) && !isNaN(Number(limit))) {
      return {
        page: Number(page),
        limit: Number(limit),
      };
    } else if (page && !limit && !isNaN(Number(page))) {
      return {
        page: Number(page),
      };
    }
    return { page: 1 };
  };
}

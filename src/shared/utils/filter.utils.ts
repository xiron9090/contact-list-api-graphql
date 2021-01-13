export default class FilterUtils {
  public static parseFilter = (filter: JSON) => {
    if (!filter) {
      return {};
    }
    const stringFilter = JSON.stringify(filter)
      .replace('"_in":', '"$in":')
      .replace('"_or":', '"$or":')
      .replace('"_and":', '"$and":')
      .replace('"_eq":', '"$eq":')
      .replace('"_nin":', '"$nin":')
      .replace('"_regex":', '"$regex":')
      .replace('"_set":', '"$set":')
      .replace('"_unset":', '"$unset":')
      .replace('"_inc":', '"$inc":')
      .replace('"_options":', '"$options":');
    return JSON.parse(stringFilter);
  };
}

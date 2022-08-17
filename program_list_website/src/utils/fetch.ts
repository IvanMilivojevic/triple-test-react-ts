export async function getData<T>(resource: string, query: string) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${resource}${query}`);
  const data: T[] = await response.json();

  return data;
}

// TODO: filters parameter should be generic U type but there is dynamic access to keys
// This makes TS to assign unknown type because not sure what will be accessed
export function getQuery<U>(filters: any) {
  const params: string[] = [];

  Object.keys(filters).forEach((filter) => {
    if (filters[filter]) {
      params.push(`${filter}${filter === "name" ? "_like" : ""}=${filters[filter]}`);
    }
  });

  const query = params.length > 0 ? `?${params.join("&")}` : "";

  return query;
}

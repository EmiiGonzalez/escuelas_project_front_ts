export interface Page<T> {
  content: T[]; // Los datos devueltos en la página
  totalElements: number; // Número total de elementos
  totalPages: number; // Número total de páginas
  size: number; // Tamaño de la página
  number: number; // Número de la página actual (0-indexado)
  numberOfElements: number; // Número de elementos en la página actual
  last: boolean; // Indica si es la última página
  first: boolean; // Indica si es la primera página
  empty: boolean; // Indica si la página está vacía
  sort: Sort; // Información de ordenamiento
  pageable: Pageable; // Información de paginación
}

export interface Sort {
  sorted: boolean; // Indica si los datos están ordenados
  unsorted: boolean; // Indica si los datos no están ordenados
  empty: boolean; // Indica si no hay ordenamiento
}

export interface Pageable {
  sort: Sort; // Información de ordenamiento para esta página
  pageNumber: number; // Número de la página (0-indexado)
  pageSize: number; // Tamaño de la página
  offset: number; // El desplazamiento desde el inicio de la lista de elementos
  paged: boolean; // Indica si la página está paginada
  unpaged: boolean; // Indica si la página no está paginada
}

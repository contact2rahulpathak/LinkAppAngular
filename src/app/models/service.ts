export interface Links {
    self: string;
  }
  
  export interface Attributes {
    name: string;
  }
  
  export interface Response {
    id: string;
    type: string;
    links: Links;
    attributes: Attributes;
  }
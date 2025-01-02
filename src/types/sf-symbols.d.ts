declare module "*.json" {
  const value: {
    id: string;
    name: string;
    svg: string;
    tags: string[];
  }[];
  export default value;
}
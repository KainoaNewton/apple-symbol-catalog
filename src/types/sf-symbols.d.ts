declare module "*.json" {
  const value: {
    id: string;
    name: string;
    svg: string;
  }[];
  export default value;
}
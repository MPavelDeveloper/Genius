export class Family {

  // props
  public id : string;
  public father:string;
  public mother: string;
  public children: Array<string>;

  // constr
  constructor(id:string, father: string, mother: string, children: Array<string>) {
    this.id = id;
    this.father = father;
    this.mother = mother;
    this.children = children;
  }

}

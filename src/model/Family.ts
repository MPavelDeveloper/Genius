export class Family {

  // props
  public id : string;
  public father:string | null;
  public mother: string | null;
  public children: Array<string> | null;

  // constr
  constructor(id:string, father: string | null, mother: string | null, children: Array<string> | null) {
    this.id = id;
    this.father = father;
    this.mother = mother;
    this.children = children;
  }

}

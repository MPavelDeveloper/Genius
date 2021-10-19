export class FamilyDTO {
  husband: number;
  wife: number;
  children: Array<number>;
}

export class PersonDTO {
  name: {
    first?: string,
    middle?: string,
    last?: string,
  };
  gender: string;
}

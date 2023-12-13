@Entity({ name: 'step' })
export class StepEntity {
  id: number;
  description: string;
  duration: string;
  recipeId: number;
  createAt: Date;
  updateAt: Date;
}

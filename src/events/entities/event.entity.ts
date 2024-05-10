import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @ManyToMany(() => User, (user) => user.eventsJoined, { cascade: true })
    @JoinTable()
    users: User[];

    @ManyToOne(() => User, (user) => user.eventsCreated)
    user: User;
}

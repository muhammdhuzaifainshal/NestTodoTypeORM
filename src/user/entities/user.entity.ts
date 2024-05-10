import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "src/task/entity/task.entity";
import { Event } from "src/events/entities/event.entity";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => Task, (taks) => taks.user)
    tasks: Task[]

    @ManyToMany(() => Event, (events) => events.user)
    eventsJoined: Event[];

    @OneToMany(() => Event, (events) => events.user)
    eventsCreated: Event[];

}

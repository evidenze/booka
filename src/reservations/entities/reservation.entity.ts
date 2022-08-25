import { Customer } from "src/customers/entities/customer.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    reservation_id: number;

    @Column()
    room_type: string;

    @Column()
    amount_paid: number;

    @Column()
    status: string;

    @Column({default: false})
    is_checked_out: boolean;

    @Column()
    checking_time: Date;

    @Column()
    checkout_time: Date;

    @Column()
    customer_id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;
}

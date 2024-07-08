import { db } from "@/lib/db";
import { Form } from "./form";

export default async function OrganizationIdPage() {
    const boards = await db.board.findMany();

    return (
        <div className="flex flex-col space-y-4">
          <Form />
           <div className="space-y-2">
            {boards.map(board => (
                <div key={board.id}>
                    Board title: {board.title}
                </div>
            ))}
           </div>
        </div>
    )
}
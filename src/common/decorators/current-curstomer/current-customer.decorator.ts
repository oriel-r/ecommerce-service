import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CurrentCustomer } from "src/common/interfaces/current-customer.interface";
import { JwtPayload } from "src/common/interfaces/jwt-payload.interface";

export const CurrentMember = createParamDecorator(
    (data: unknown, context: ExecutionContext): CurrentCustomer => {
        const req = context.switchToHttp().getRequest()
        const {sub, storeId} = req.user as JwtPayload
        return {
            memberId: sub,
            storeId: storeId!
        }
    }
)
import UserRegisterValidator from 'App/Validators/UserRegisterValidator';
import UserUpdateValidator from 'App/Validators/UserUpdateValidator';
import { ReportPage } from 'Database/entities/reportpage';
import { User } from 'Database/entities/user';
import { ic } from 'azle';
import { Response, Request } from 'express';

export default class ReportPageController {
  static async report(request: Request, response: Response) {
    const { data, success, error } = UserRegisterValidator.validate(request.body);

    if (!success) {
      response.status(400);
      const { path, message } = error.issues?.[0];

      return response.json({
        status: 0,
        message: `${path?.join('.')}: ${message}`,
      });
    }

    const { email, username, name } = data;

    const userData: Partial<User> = {
      email,
      name,
      username,
      principal_id: ic.caller().toText(),
      status: 1,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    try {
      const isUserExists = await User.findOne({
        where: [{ email }, { principal_id: ic.caller().toText() }, { username }],
      });

      if (isUserExists) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Username/Email/Identity already taken.',
        });
      }

      await User.save(userData);

      return response.json({
        status: 1,
        message: 'Registration success!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }
}

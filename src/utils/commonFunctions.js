import { ConflictError, NotFoundError } from '../middlewares/errorMiddleware.js';

function throwNotFoundError(item, itemName) {
  if (!item) {
    throw new NotFoundError(`해당 id의 ${itemName}을(를) 찾을 수 없습니다.`);
  }
}

function throwFoundError(item, itemName) {
  if (item) {
    throw new ConflictError(`해당 id의 ${itemName}가(이) 존재합니다.`);
  }
}

function checkAccess(userId, targetUserId, accessType) {
  if (userId !== targetUserId) {
    throw new ConflictError(`${accessType} 권한이 없습니다.`);
  }
}

export { throwNotFoundError, throwFoundError, checkAccess };

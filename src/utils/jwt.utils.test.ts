import { describe, expect, it } from 'vitest';
import { isTokenValid } from './jwt.utils';

const EXPIRED_TOKEN = 'eyJhbGciOi...';
const VALID_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJyb2xlIjoianVyeSIsImlhdCI6MTc3OTk3MTA5NSwiZXhwIjoxNzc5OTc4Mjk1fQ.vPQqSrUNgnNeqQtw0KPCZx55_L06Sf2FGlcHfodRuOQ';
describe('isTokenValid', () => {
  it('retourne false si le token est invalide', () => {
    expect(isTokenValid('token_invalide')).toBe(false);
  });
  it('retourne false si le token est expiré', () => {
    expect(isTokenValid(EXPIRED_TOKEN)).toBe(false);
  });
  it('retourne true si le token est valide', () => {
    expect(isTokenValid(VALID_TOKEN)).toBe(true);
  });
});

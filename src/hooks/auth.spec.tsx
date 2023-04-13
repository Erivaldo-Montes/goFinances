import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./auth";
import { mocked } from "ts-jest/utils";
import { startAsync } from "expo-auth-session";

jest.mock("expo-auth-session");

describe("auth hook", () => {
  it("should be able sign in with google account existing", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: "success",
      params: {
        access_token: "token",
      },
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => {
          return Promise.resolve({
            email: `userInfo.email`,
            id: `userInfo.id`,
            name: `userInfo.given_name`,
            locale: `userInfo.locale`,
            photo: `userInfo.picture`,
            verified_email: `userInfo.verified_email`,
          });
        },
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    console.log(result.current.user);
    expect(result.current.user).toBeTruthy();
  });

  it("user should not connect if cancel authentication with google", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });

  it(" should be error incorrectly  google parameters", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    try {
      await act(() => result.current.signInWithGoogle());
    } catch (error) {
      expect(result.current.user).toEqual({});
    }
  });
});

import React, { useState, useEffect, useContext } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import useIsMount from "../../hooks/useIsMount";
import { isDefined, isNullable } from "../../utils/null-checks";

const FavoritesToggle = ({ id, size }) => {
  const { userData, setGlobalMsg } = useContext(UserContext);

  const decideChecked = () => {
    if (isDefined(userData.user) && userData.user.favorites.includes(id)) {
      return true;
    }
    return false;
  };

  const [checked, setChecked] = useState(decideChecked);
  // Used to detect initial render of component
  const isMount = useIsMount();

  useEffect(() => {
    const addToFavorites = () => {
      // Check user auth
      if (isNullable(userData.user)) {
        setGlobalMsg({
          message: "You must be logged in to favorite listings",
          variant: "danger",
        });
        return;
      }

      Axios.post(
        "/api/users/add-to-favorites",
        { id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        }
      ).catch((err) => {
        console.error(err);
      });
    };

    // Don't post at initial render
    if (!isMount) {
      addToFavorites();
    }
    // eslint-disable-next-line
  }, [checked]);

  return (
    <ButtonGroup toggle style={{ float: "right" }}>
      <ToggleButton
        type="checkbox"
        checked={checked}
        className="heart-toggle py-0 px-0"
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        {checked ? (
          <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            className="bi bi-star-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        ) : (
          <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            className="bi bi-star"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
            />
          </svg>
        )}
      </ToggleButton>
    </ButtonGroup>
  );
};

export default FavoritesToggle;

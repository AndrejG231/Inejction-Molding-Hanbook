import { Box, Button, Input } from "@chakra-ui/react";
import React, { FC } from "react";
import { plansEditProps } from "../../types/plansTypes";

export const PlansEdit: FC<plansEditProps> = ({
  values,
  setEditValues,
  saveEdits,
}) => {
  return (
    <Box>
      <Input
        type="number"
        value={values.time}
        onChange={(event) =>
          setEditValues({ ...values, time: ~~event.target.value })
        }
      />
      <Input
        value={values.mold}
        onChange={(event) =>
          setEditValues({ ...values, mold: event.target.value })
        }
      />
      <Input
        type="number"
        value={values.nextForm}
        onChange={(event) =>
          setEditValues({ ...values, nextForm: ~~event.target.value })
        }
      />
      <Button onClick={saveEdits}>Save</Button>
    </Box>
  );
};

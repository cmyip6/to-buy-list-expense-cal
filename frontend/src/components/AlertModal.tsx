import { Alert, Button, Group, Modal } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons";
import { useAppSelector } from "../store";

interface ConfirmationHubProps {
    message : string 
    onDelete: () => void;
    onClose: () => void;
}

export function AlertModal(props: ConfirmationHubProps) {
    const toggle = useAppSelector(state=>state.toBuyList.triggerAlertModel)

  return (
    <Modal
      centered
      opened={toggle}
      title="Confirmation Required" onClose={props.onClose}    >
      <Alert icon={<IconAlertCircle size={16} />} title="Attention!" color="red" radius="md">
        {props.message}
      </Alert>

      <Group position="center" style={{ paddingTop: '10px' }}>
        <Button leftIcon={<IconCheck />} variant="white" onClick={props.onDelete}>Confirm</Button>
        <Button leftIcon={<IconX />} variant="white" onClick={props.onClose}>Cancel</Button>

      </Group>

    </Modal>
  )
}
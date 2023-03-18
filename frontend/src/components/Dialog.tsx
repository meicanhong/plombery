import { Card, Flex, Subtitle, Title } from '@tremor/react'
import {
  createRef,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useEffect,
} from 'react'

interface Props extends PropsWithChildren {
  footer?: ReactNode
  isOpen?: boolean
  subtitle?: string
  title?: string
  onClose?: () => any
}

const Dialog: React.FC<Props> = ({
  children,
  footer,
  isOpen: open,
  subtitle,
  title,
  onClose,
}) => {
  const dialog = createRef<HTMLDialogElement>()

  useEffect(() => {
    if (open) {
      dialog.current?.showModal()
    } else {
      dialog.current?.close()
    }
  }, [open])

  const closeDialogOnBackdropClick: MouseEventHandler<HTMLDialogElement> = (
    event
  ) => {
    var rect = dialog.current!.getBoundingClientRect()
    var isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width

    if (!isInDialog) {
      if (onClose) {
        onClose()
      } else {
        dialog.current?.close()
      }
    }
  }

  return (
    <dialog
      ref={dialog}
      style={{ padding: 0, background: 'transparent', overflow: 'visible' }}
      onClick={closeDialogOnBackdropClick}
    >
      <Card>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}

        <div
          className={(title || subtitle) && 'mt-6'}
          style={{ minWidth: 350, maxWidth: 600, overflow: 'auto' }}
        >
          {children}
        </div>

        {footer && (
          <Flex
            justifyContent="justify-end"
            spaceX="space-x-6"
            marginTop="mt-6"
          >
            {footer}
          </Flex>
        )}
      </Card>
    </dialog>
  )
}

export default Dialog
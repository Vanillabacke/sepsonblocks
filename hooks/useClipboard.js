// hooks/use-clipboard-api.js
import { useState, useCallback } from 'react';


/*
*   https://dev.to/viclafouch/5-useful-and-modern-custom-hooks-for-your-react-app-3dl
*/

function useClipboardApi() {
  const [content, setContent] = useState(null)

  const askPermission = useCallback(async queryName => {
    try {
      const permissionStatus = await navigator.permissions.query(queryName)
      return permissionStatus.state === 'granted'
    } catch (error) {
      // Browser compatibility / Security error (ONLY HTTPS) ...
      return false
    }
  }, [])

  const copy = useCallback(
    async blob => {
      const hasWritePermission = await askPermission({ name: 'clipboard-write' })
      if (hasWritePermission) {
        const content = [new ClipboardItem({ [blob.type]: blob })]
        await navigator.clipboard.write(content).then(read)
      }
    },
    [askPermission, read]
  )

  const read = useCallback(async () => {
    const hasReadPermission = await askPermission({ name: 'clipboard-read' })
    if (hasReadPermission) {
      const content = await navigator.clipboard.read()
      setContent(content)
    }
  }, [askPermission])

  useEffect(() => {
    read()
  }, [read])

  return { content, copy }
}

export default useClipboardApi
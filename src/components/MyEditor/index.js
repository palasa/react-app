import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function MyEditor(props) {
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState('') // 编辑器内容
  const { 
    toolbarConfig , toolbarMode, toolbarStyle, 
    editorConfig , editorMode, editorStyle,
    onChange,
  } = props

  const onEditorChange = editor => {
    onChange(editor.getHtml())
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode={toolbarMode}
          style={toolbarStyle}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={onEditorChange}
          mode={editorMode}
          style={editorStyle}
          {...props}
        />
      </div>
    </>
  )
}

export default MyEditor

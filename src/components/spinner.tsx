import React from 'react'

import './spinner.css'
import {logoUri} from 'components'

type Props = Omit<React.ComponentProps<'img'>, 'src'>

export const Spinner = ({className = '', alt = 'spinner', ...props}: Props) => (
  <img {...props} src={logoUri} className={className + ' spinner'} alt={alt} />
)

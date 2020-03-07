import React from 'react'

import {logoUri} from 'components'

import './spinner.css'

type Props = Omit<React.ComponentProps<'img'>, 'src'>

export const Spinner = ({className = '', alt = 'spinner', ...props}: Props) => (
  <img {...props} src={logoUri} className={className + ' spinner'} alt={alt} />
)

'use client';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  href: string;
  icon: IconDefinition;
  label: string;
};

export default function ShortCutButton(props: Props) {
  return (
    <Link 
      href={props.href} 
    >
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded 
        ml-2 flex items-center gap-2" title={props.label}>
        <FontAwesomeIcon icon={props.icon} />
      </button>
    </Link>
  );
}

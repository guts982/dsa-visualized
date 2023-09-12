
import type { Metadata } from 'next'

import { Quicksand } from 'next/font/google';


const quiksand = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DSA - Equation Solver',
    description: 'Solve equations with Infix to Postfix conversion',
  }


const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
         <section  className={quiksand.className}>{children}</section>
    );
};

export default layout;